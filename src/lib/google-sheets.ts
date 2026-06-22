const LOCAL_STORAGE_KEY = 'cham_orders_spreadsheet_id';

export const createOrdersSheet = async (accessToken: string) => {
  const response = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      properties: {
        title: 'Chạm Pre-Orders Database',
      },
      sheets: [
        {
          properties: {
            title: 'Orders',
          },
        },
      ],
    }),
  });
  if (!response.ok) throw new Error('Failed to create spreadsheet');
  const data = await response.json();
  
  // Add headers
  await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${data.spreadsheetId}/values/Orders!A1:H1:append?valueInputOption=USER_ENTERED`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      values: [['Order ID', 'Date', 'Customer Name', 'Customer Email', 'Phone', 'Address', 'Total Amount', 'Items Summary']],
    }),
  });
  
  return data.spreadsheetId;
};

export const getOrCreateSpreadsheet = async (accessToken: string) => {
  let id = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!id) {
    id = await createOrdersSheet(accessToken);
    localStorage.setItem(LOCAL_STORAGE_KEY, id);
  }
  return id;
};

export const recordOrderToSheet = async (
  accessToken: string, 
  spreadsheetId: string, 
  orderData: any[]
) => {
  const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Orders!A:H:append?valueInputOption=USER_ENTERED`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      values: [orderData],
    }),
  });
  
  if (!response.ok) {
    // If it fails, maybe the spreadsheet was deleted, let's try to clear id and recreate next time
    if (response.status === 404) {
       localStorage.removeItem(LOCAL_STORAGE_KEY);
       throw new Error('Spreadsheet not found. It will be recreated on next order.');
    }
    throw new Error('Failed to append to spreadsheet');
  }
  return response.json();
};

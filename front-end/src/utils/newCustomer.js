export function getOrCreateCustomerId() {
  let data = localStorage.getItem('customerIdData');
  let newIdNeeded = false;

  if (data) {
    const parsed = JSON.parse(data);
    const createdDate = new Date(parsed.date);
    const today = new Date();

    if (
      createdDate.getFullYear() !== today.getFullYear() ||
      createdDate.getMonth() !== today.getMonth() ||
      createdDate.getDate() !== today.getDate()
    ) {
      newIdNeeded = true;
    } else {
      return parsed.id;
    }
  }

  if (!data || newIdNeeded) {
    const newId = crypto.randomUUID();
    localStorage.setItem(
      'customerIdData',
      JSON.stringify({
        id: newId,
        date: new Date().toISOString(),
      })
    );
    return newId;
  }
}

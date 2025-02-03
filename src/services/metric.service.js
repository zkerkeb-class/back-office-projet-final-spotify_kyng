export const getServerMetrics = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SOCKET_URL}/metrics`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error getting metrics', error);
  }
};

export const resetServerMetrics = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SOCKET_URL}/metrics/reset`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({}),
    });
    const data = await response.json();
    console.log({ data });

    if (data.error) {
      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    console.error('Error resetting metrics', error);
  }
};

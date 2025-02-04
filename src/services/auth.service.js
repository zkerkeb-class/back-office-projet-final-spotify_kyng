export const login = async (email, password) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    if (response.ok) {
        const data = await response.json();
        return data.token;
    }
    throw new Error(`Status : ${response.status} \n Invalid credentials`);
 
  } catch (error) {
    throw error;
  }
};

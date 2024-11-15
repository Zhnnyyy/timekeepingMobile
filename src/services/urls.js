export function URL() {
  return {
    login: 'http://192.168.0.49:3002/query/mobile/login.php',
    otp: 'http://192.168.0.49:3002/query/mobile/mail/mail.php',
  };
}

export async function executeRequest(url, method, data, result) {
  result({error: false, loading: true});
  const request = await fetch(url, {
    method,
    body: data,
    headers: {'Content-Type': 'application/json'},
  });
  if (request.ok) {
    const data = await request.json();
    return result({error: false, loading: false, data: data});
  } else {
    return result({error: true, loading: false, data: 'Internal Server Error'});
  }
}

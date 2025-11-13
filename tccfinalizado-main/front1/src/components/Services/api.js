const API_BASE_URL = "http://localhost:5010";

async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(url, config);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Erro na API (${response.status}): ${errorText}`);
  }

  try {
    return await response.json();
  } catch {
    return {};
  }
}


export async function enviarMensagem(dados) {
  return await apiRequest("/contato2", {
    method: "POST",
    body: JSON.stringify(dados),
  });
}

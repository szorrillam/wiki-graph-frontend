export function toCurl({ method, url, headers, body }: { method: string; url: string; headers?: Record<string, string>; body?: unknown }) {
  const h = Object.entries(headers ?? {}).map(([k, v]) => `-H ${JSON.stringify(`${k}: ${v}`)}`).join(' ');
  const data = body === undefined ? '' : `--data ${JSON.stringify(JSON.stringify(body))}`;
  return `curl -X ${method.toUpperCase()} ${h} ${data} ${JSON.stringify(url)}`.trim();
}



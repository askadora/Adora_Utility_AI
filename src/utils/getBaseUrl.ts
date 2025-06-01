export function getBaseUrl() {
  return process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
}

export function getAdorahqUrl() {
  return process.env.NEXT_PUBLIC_ADORAHQ_URL || 'http://localhost:3001';
} 
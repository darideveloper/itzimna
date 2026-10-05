// Global variables
const host = process.env.NEXT_PUBLIC_HOST

/**
 * Save a lead using lecal API
 */
export async function saveLead(name, email, phone, message, property = "") {

  // Send data to endpoint
  const endpoint = `${host}/api/leads/`
  const data = {
    name,
    email,
    phone,
    message,
    property: typeof property === 'string' ? property : (property?.name || ""),
  }
  const dataJson = JSON.stringify(data)
  const headers = {
    'Content-Type': 'application/json',
  }
  const res = await fetch(endpoint, {
    method: 'POST',
    headers,
    body: dataJson,
  })
  
  // Return true if success
  if (res.ok) {
    return true
  } else {
    console.error('Error saving lead', res)
    return false
  }
}
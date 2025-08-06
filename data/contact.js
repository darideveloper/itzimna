export const phone = '529991439832'
export const phoneDariDev = '524493402622'
export const phoneWhatsapp = phone.replace("52", "521")
export const phoneWhatsappDariDev = phoneDariDev.replace("52", "521")
export const whatsappBaseLink = `https://api.whatsapp.com/send?phone=${phoneWhatsapp}`
export const whatsappBaseLinkDariDev = `https://api.whatsapp.com/send?phone=${phoneWhatsappDariDev}`
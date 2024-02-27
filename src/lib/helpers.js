export const putFileinFormData = (f, dataName=f.name) => {
  return new Promise(resolve => {
    const form = new FormData();
    form.append(dataName, f, f.name);
    resolve(form);
  });
};

export function generateBasicHTTPError(e, options = {}) {
  return new Response(e.message, {
    status: options.statusCode || e.statusCode || 500,
    ...options,
  });
}

export const cleanPhone = (phone) => {
  //get rid of all non-numeric characters
  return phone.replace(/\D/g, '');
}


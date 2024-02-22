export const putFileinFormData = (f, dataName=f.name) => {
    return new Promise(resolve => {
      const form = new FormData();
      form.append(dataName, f, f.name);
      resolve(form);
    });
  };
  
export const cleanPhone = (phone) => {
    //get rid of all non-numeric characters
    return phone.replace(/\D/g, '');
  }


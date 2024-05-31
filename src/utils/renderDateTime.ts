export const renderDateTime = (dateString: any) => {
    const dateTime = new Date(dateString);
    return dateTime.toLocaleDateString();
  };
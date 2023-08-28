// Save the blob in a file
export const exportBlob = (blob: Blob, filename: string, extension: string) => {
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}.${extension}`;
  a.click();

  setTimeout(() => {
    URL.revokeObjectURL(url);
  });
};

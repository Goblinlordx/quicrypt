import ClipboardJS from "clipboard";

export const toClipboard = async () => {
  const clip = new ClipboardJS("#copy");
  let success = true;
  try {
    await new Promise((res, rej) => {
      clip.on("success", res);
      clip.on("error", rej);
    });
  } catch (err) {
    console.error(err);
    success = false;
  }
  clip.destroy();

  return success;
};

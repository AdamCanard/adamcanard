export const postData = async (formData: FormData) => {
  try {
    const response = await fetch("/api/suggestion/", {
      method: "POST",
      body: formData,
    });
    return response;
  } catch (err: unknown) {
    if (err instanceof Error) {
      return new Response(
        JSON.stringify({ error: err.message || err.toString() }),
        {
          status: 500,
          headers: {},
        },
      );
    } else {
      console.log(err);
    }
  }
};

export const submitHandler = async (
  formData: FormData,
  url: string,
  method: string
) => {
  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: formData.get("title"),
      description: formData.get("description"),
      priority: formData.get("priority"),
      dueDate: formData.get("dueDate"),
      completed: formData.get("completed") === "on",
    }),
  });

  if (!response.ok) {
    const result = await response.json();
    throw new Error(result.error || "Failed to save task");
  }
};

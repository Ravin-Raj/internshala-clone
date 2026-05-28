const API_URL =
  "https://internshala.com/flutter_hiring/search";

export async function fetchInternships() {
  try {
    const response = await fetch(API_URL);

    const data = await response.json();

    return data.internships_meta;
  } catch (error) {
    console.log(error);
    return [];
  }
}
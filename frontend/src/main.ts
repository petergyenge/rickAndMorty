import "./style.css";
import http from "axios";
import { z } from "zod";

const apiUrl = "https://rickandmortyapi.com/api/character"

const ResponseSchema = z.object({
      id: z.number(),
      name: z.string(),
      status: z.string(),
      species: z.string(),
      type: z.string(),
      gender: z.string(),
      image: z.string(),
    }
).array();

type Response = z.infer<typeof ResponseSchema> | null;


const getData = async (apiURL: string): Promise<Response | null> => {
  const response = await http.get(apiURL);
  const data = response.data;
  const result = ResponseSchema.safeParse(data);
  if (!result.success) {
    console.error;
    console.log("null")
    return null;
  }
  console.log("data")
  console.log(result)
  return data;
};

getData(apiUrl)


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
);

const test = document.getElementById("test") as HTMLParagraphElement

type Response = z.infer<typeof ResponseSchema> | null;

const renderData = (data:Response) =>{
    test.innerHTML = data!.name
    console.log(data!.name)

}

let nameArray: string[] = []
const listedNames = (data:Response) =>{
  for (let index = 0; index < data!.name.length; index++) {
     nameArray = [...nameArray, data!.name];
    
  }

}

const getData = async (apiURL: string): Promise<Response | null> => {
  const response = await http.get(apiURL);
  const data = response.data;
  const result = ResponseSchema.safeParse(data);
  if (!result.success) {
    console.error;
    return null;
  }
  listedNames(data)
  renderData(data)
  console.log(nameArray)
  console.log(data!.name)
  return data;
};

getData(apiUrl)

console.log()
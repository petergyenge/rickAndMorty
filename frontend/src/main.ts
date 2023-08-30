import "./style.css";
import http /* ,{AxiosError, AxiosResponse} */ from "axios";
import { z } from "zod";

 const apiURL = "https://rickandmortyapi.com/api/character/"

const ResponseSchema = z.object({
      id: z.number(),
      name: z.string(),
      status: z.string(),
      species: z.string(),
      type: z.string(),
      gender: z.string(),
      image: z.string(),
    }
)
 

/* const ResponseSchema = z.object({
  date: z.string(),
  explanation: z.string(),
  url: z.string(),
  title: z.string(),
});


const apiURL = `https://api.nasa.gov/planetary/apod?api_key=agJ4RiUMnTdtLXjD89PG084vSK89goRLAd971PKd`;
 */

type Response = z.infer<typeof ResponseSchema> | null;
const name = document.getElementById("test") as HTMLParagraphElement
const randomImg = document.getElementById("randomImg") as HTMLImageElement



const getData = async (apiURL: string): Promise<Response | null> => {
  const response = await http.get(apiURL);
  const data = response.data;
  const result = ResponseSchema.safeParse(data);
  if (!result.success) {
    console.error;
    console.log(result)
    return null;
  }
  const render = () =>{
    name.innerHTML = data.name
    randomImg.src = data.image
  }
  render()
  return data;
};
getData(apiURL)


document.getElementById("mathRandom")!.addEventListener("click", () =>{
  function randomIntFromInterval(min: number, max: number) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
 let randomNumber =  randomIntFromInterval(0, 200)
 console.log(randomNumber)
 getData(apiURL + randomNumber)

})


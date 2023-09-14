import "./style.css";
import axios /* ,{AxiosError, AxiosResponse} */ from "axios";
import { z } from "zod";


 const apiURLCharacter = "http://localhost:3333/api/character"
 const apiURLResfresh = "http://localhost:3333/api/refresh"

const ResponseSchema = z.object({
    results: z.object({
      id: z.number(),
      name: z.string(),
      status: z.string(),
      species: z.string(),
      gender: z.string(),
      image: z.string(),
    }
  ).array()
})

const characterSchema = z.object({
  id: z.number(),
  userName: z.string(),
  characterName: z.string(),
}).array();
 
type Response = z.infer<typeof ResponseSchema> | null;
type Responsecharacter = z.infer<typeof characterSchema>;

const name = document.getElementById("name") as HTMLParagraphElement
const species = document.getElementById("species") as HTMLParagraphElement
const status = document.getElementById("status") as HTMLParagraphElement
const gender = document.getElementById("gender") as HTMLParagraphElement
const image = document.getElementById("image") as HTMLImageElement
const likeButton = document.getElementById("likeButton") as HTMLButtonElement





const refresCharacter = async (apiURLResfresh: string) => {
  const response = await axios.get(apiURLResfresh);
  const data = response.data;
  const result = characterSchema.safeParse(data);
  if (!result.success) {
    return null;
  }
  renderLikedCharaters(result.data)
  return data;
}

const renderLikedCharaters = (data: Responsecharacter) =>{
  document.getElementById("friss")!.innerHTML =
  `${data!.map(charname =>
    `<div class="card w-96 bg-base-100 shadow-xl content-center">
          <h2 class="card-title p-2">${charname.characterName}</h2>
          <button type="button" class="btn btn-xs" id="${charname.id}">delete</button>
        </div>`).join("")}`

  for(const character of data){
    document.getElementById( "" +character.id)?.addEventListener("click", deleteCaracter)
  }
    
}

const getCharacter = async (apiURLCharacter: string) => {
  const response = await axios.get(apiURLCharacter);
  const data = response.data;
  const result = ResponseSchema.safeParse(data);
  if (!result.success) {
    return null;
  }
  render(result.data, rndInt)
  return data;
}


let characterName = ""

const render = (data: Response, id:number) =>{
  name.innerHTML = data!.results[id].name
  status.innerHTML = data!.results[id].status
  species.innerHTML = data!.results[id].species
  gender.innerHTML = data!.results[id].gender
  image.src = data!.results[id].image
  characterName = data!.results[id].name
}

let rndInt = 0

const randomIntFromInterval = (min:number, max:number) => {
  let result = Math.floor(Math.random() * (max - min + 1) + min)
  rndInt = result
  return rndInt
}

const startHTML = () => {
  randomIntFromInterval(0, 300)
  getCharacter(apiURLCharacter)
  refresCharacter(apiURLResfresh)
}
startHTML()


document.getElementById("mathRandom")!.addEventListener("click", () =>{
  randomIntFromInterval(0, 300)
  getCharacter(apiURLCharacter)
})

const nameInput = document.getElementById('nameInput') as HTMLInputElement;

const addLiked = () => {
  const userName = nameInput.value;
  if(userName !== ""){
    refresCharacter(apiURLResfresh)
    axios.post('http://localhost:3333/api/liked',  {userName, characterName} );
    nameInput.value = '';
  }else{
    console.error('Hiba történt a név hozzáadása közben:');
  }
};

likeButton.addEventListener('click', addLiked)



const deleteCaracter = async (event: MouseEvent) => {
  refresCharacter(apiURLResfresh)
  const response = await axios.delete(`http://localhost:3333/api/del/${(event.target as HTMLButtonElement).id}`)
  response
}
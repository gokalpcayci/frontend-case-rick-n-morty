import axios from "axios";
import { Character } from "@/types";

export async function getRicks({
  pageParam = 1,
}): Promise<{ results: Character[]; nextPage?: number; prevPage?: number }> {
  const ricks = await axios
    .get(`https://rickandmortyapi.com/api/character/?page=${pageParam}`)
    .then((res) => res.data);

  return {
    results: ricks.results,
    nextPage: ricks.info.next ? pageParam + 1 : undefined,
    prevPage: ricks.info.prev ? pageParam - 1 : undefined,
  };
}

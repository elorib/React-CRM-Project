import httpService from "./http-service";

export function createCard(card) {
  return httpService.post("api/cards", card);
}

export function getAll() {
  return httpService.get("api/cards");
}

export function deleteCard(id) {
  return httpService.delete(`api/cards/${id}`);
}

export function editCard(id, card) {
  return httpService.put(`api/cards/${id}`, card);
}

const cardsService = {
  createCard,
  deleteCard,
  editCard,
  getAll,
};

export default cardsService;

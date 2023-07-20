import { create } from 'zustand'; // durum yönetim kütüphanesi.

export interface ModalStoreInterface {
  movieId?: string;
  isOpen: boolean;
  openModal: (movieId: string) => void;  // id ye göre modal açar
  closeModal: () => void;  // modalı kapatır ve movieId degerni sıfırlar. 
}


// zustand oluşturulur. 
const useSeriesModalStore = create<ModalStoreInterface>((set) => ({
  movieId: undefined,  // başlangıçta id yok
  isOpen: false,
  openModal: (movieId: string) => set({ isOpen: true, movieId }),  // movieId alır ve buna göre store'un durumunu günceller 
  closeModal: () => set({ isOpen: false, movieId: undefined }),
}));

export default useSeriesModalStore;

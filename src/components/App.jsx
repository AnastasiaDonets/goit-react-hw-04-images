import React, { useState, useEffect } from 'react';
import { ImageGallery } from '../components/ImageGallery/ImageGallery';
import { Modal } from '../components/Modal/Modal';
import { Searchbar } from '../components/Searchbar/Searchbar';
import { fetchImages } from '../services/api';
import { Notify } from 'notiflix';
import { Button } from '../components/Button/Button';
import { Loader } from '../components/Loader/Loader';

export const App = () => {
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [loadMoreBtn, setLoadMoreBtn] = useState(false);

  const onClickLoadMore = () => {
    setPage(prev => prev + 1);
    setIsLoading(true);
    setLoadMoreBtn(true);
  };

  const onOpenModal = url => {
    setOpenModal(true);
    setLargeImageURL(url);
  };

  const onModalClose = () => {
    setOpenModal(false);
    setLargeImageURL('');
  };

  const onSubmit = evt => {
    evt.preventDefault();
    setSearch(evt.target.search.value.trim().toLowerCase());
    setIsLoading(true);
    setImages([]);
    setPage(1);
    evt.target.reset();
  };

  useEffect(() => {
    if (!search) return;
    const fetchGallery = async seach => {
      try {
        const response = await fetchImages(search, page);
        setImages(prev => [...prev, ...response]);
        if (response.length < 1) {
          Notify.failure('Not found');
        }

        if (response.length < 12) {
          setIsLoading(false);
          setLoadMoreBtn(false);
        }

        if (response.length === 12) {
          setIsLoading(true);
          setLoadMoreBtn(true);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchGallery(search, page);
  }, [search, page]);

  return (
    <div>
      <Searchbar onSubmit={onSubmit} />
      <ImageGallery
        images={images}
        openModal={onOpenModal}
        onLoadMore={onClickLoadMore}
      />{' '}
      {isLoading && <Loader />}
      {loadMoreBtn && <Button onClickLoadMore={onClickLoadMore} />}
      {openModal && (
        <Modal largeImageURL={largeImageURL} onModalClose={onModalClose} />
      )}
    </div>
  );
};

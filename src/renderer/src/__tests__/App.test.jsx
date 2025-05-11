import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

describe('Компонент <App />', () => {
  beforeEach(() => {
    // Мокаем window.api
    window.api = {
      getPartners: jest.fn()
    };
  });

  it('должен запрашивать партнёров и отображать их', async () => {
    const partners = [
      {
        id: 1,
        organization_type: 'LLC',
        name: 'TestCo',
        ceo: 'Ivan',
        phone: '123',
        rating: 4,
        discount: 10
      }
    ];
    window.api.getPartners.mockResolvedValue(partners);

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    // Проверяем, что вызвался API
    expect(window.api.getPartners).toHaveBeenCalledTimes(1);

    // Ждём, пока элементы отрисуются
    await waitFor(() => {
      expect(screen.getByText('LLC | TestCo')).toBeInTheDocument();
      expect(screen.getByText('Ivan')).toBeInTheDocument();
      expect(screen.getByText('Контакты: 123')).toBeInTheDocument();
      expect(screen.getByText('Рейтинг: 4')).toBeInTheDocument();
      expect(screen.getByText('Скидка: 10%')).toBeInTheDocument();
    });
  });

  it('показывает кнопку создания партнёра', () => {
    window.api.getPartners.mockResolvedValue([]);
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('Создать партнёра')).toBeInTheDocument();
  });
});

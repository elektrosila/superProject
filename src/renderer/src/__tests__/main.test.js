/**
 * @jest-environment node
 */

import { getPartners, createPartner, updatePartner } from '../main';
import { dialog } from 'electron';

jest.mock('electron', () => ({
  dialog: {
    showMessageBox: jest.fn(),
    showErrorBox: jest.fn()
  }
}));

describe('Бэкенд-обработчики партнёров', () => {
  beforeEach(() => {
    // сбрасываем моки
    jest.clearAllMocks();
    global.dbclient = {
      query: jest.fn()
    };
  });

  describe('getPartners', () => {
    it('должен возвращать rows из ответа', async () => {
      const fakeRows = [{ id: 1, name: 'A' }];
      global.dbclient.query.mockResolvedValue({ rows: fakeRows });

      const result = await getPartners();

      expect(global.dbclient.query).toHaveBeenCalledWith(expect.stringContaining('SELECT T1.*,'));
      expect(result).toBe(fakeRows);
    });

    it('при ошибке должен логировать и возвращать undefined', async () => {
      const spy = jest.spyOn(console, 'log').mockImplementation();
      global.dbclient.query.mockRejectedValue(new Error('DB error'));

      const result = await getPartners();

      expect(spy).toHaveBeenCalledWith(expect.any(Error));
      expect(result).toBeUndefined();
      spy.mockRestore();
    });
  });

  describe('createPartner', () => {
    const fakeEvent = {};
    const partner = {
      type: 'LLC',
      name: 'TestCo',
      ceo: 'Ivan',
      email: 'a@b.com',
      phone: '123',
      address: 'Addr',
      rating: 4
    };

    it('успешно создаёт партнёра и показывает сообщение', async () => {
      global.dbclient.query.mockResolvedValue();
      
      await createPartner(fakeEvent, partner);

      expect(global.dbclient.query).toHaveBeenCalledWith(
        expect.stringMatching(/INSERT into partners/),
      );
      expect(dialog.showMessageBox).toHaveBeenCalledWith({ message: 'Успех! Партнер создан' });
    });

    it('при ошибке показывает окно ошибки', async () => {
      global.dbclient.query.mockRejectedValue(new Error('dup'));
      
      await createPartner(fakeEvent, partner);

      expect(dialog.showErrorBox).toHaveBeenCalledWith('Ошибка', 'Партнер с таким именем уже есть');
    });
  });

  describe('updatePartner', () => {
    const fakeEvent = {};
    const partner = {
      id: 5,
      type: 'Inc',
      name: 'UpdCo',
      ceo: 'Petro',
      email: 'c@d.com',
      phone: '456',
      address: 'Addr2',
      rating: 3
    };

    it('успешно обновляет и показывает сообщение', async () => {
      global.dbclient.query.mockResolvedValue();

      const result = await updatePartner(fakeEvent, partner);

      expect(global.dbclient.query).toHaveBeenCalledWith(
        expect.stringMatching(/UPDATE partners/),
      );
      expect(dialog.showMessageBox).toHaveBeenCalledWith({ message: 'Успех! Данные обновлены' });
      expect(result).toBeUndefined();
    });

    it('при ошибке возвращает "error" и показывает окно ошибки', async () => {
      global.dbclient.query.mockRejectedValue(new Error('dup'));

      const result = await updatePartner(fakeEvent, partner);

      expect(dialog.showErrorBox).toHaveBeenCalledWith('Невозможно создать пользователя', 'Такой пользователь уже есть');
      expect(result).toBe('error');
    });
  });
});

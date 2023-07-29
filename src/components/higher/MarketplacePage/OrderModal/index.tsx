import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import { OrderModalProps, IOrder, ICreateFormStateOrder } from './props';
import { useEthPrice, pricePerItem } from '@src/hooks';

import { Button, Modal } from '@src/components/common';

const defaultOrder: IOrder = {
  price: '',
  email: '',
  confirmationEmail: '',
};

const text1 = 'You need to agree with terms of service in order to submit the form';
const text2 = 'Email are not matching.';
const text3 = 'Price is not valid.';

const _createFormState = (isDisabled: boolean = false, message: string = ''): ICreateFormStateOrder => ({
  isDisabled,
  message,
});

const createFormState = (
  { price, email, confirmationEmail }: IOrder,
  hasAgreedTOS: boolean,
  isNewPurchase: boolean,
): ICreateFormStateOrder => {
  if (!price || Number(price) <= 0) return _createFormState(true, text3);

  if (isNewPurchase) {
    if (confirmationEmail.length === 0 || email.length === 0) return _createFormState(true);
    else if (email !== confirmationEmail) return _createFormState(true, text2);
  }

  if (!hasAgreedTOS) return _createFormState(true, text1);

  return _createFormState();
};

export const OrderModal: React.FC<OrderModalProps> = ({
  className,
  course,
  onClose,
  onSubmit,
  isNewPurchase,
}): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState(true);
  const [order, setOrder] = useState(defaultOrder);
  const [enablePrice, setEnablePrice] = useState(false);
  const [hasAgreedTOS, setHasAgreedTOS] = useState(false);
  const { eth } = useEthPrice();

  useEffect(() => {
    if (course) {
      setIsOpen(true);
      setOrder({ ...defaultOrder, price: pricePerItem(eth.price, 15) });
    }
  }, [course]);

  const closeModal = () => {
    setIsOpen(false);
    setOrder(defaultOrder);
    setEnablePrice(false);
    setHasAgreedTOS(false);
    onClose();
  };

  const formState = createFormState(order, hasAgreedTOS, isNewPurchase);

  return (
    <Modal isOpen={isOpen} className={cn(className)}>
      <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 className="mb-7 text-lg font-bold leading-6 text-gray-900" id="modal-title">
                {course?.title}
              </h3>
              <div className="mt-1 relative rounded-md">
                <div className="mb-1">
                  <label className="mb-2 font-bold">Price(eth)</label>
                  <div className="text-xs text-gray-700 flex">
                    <label className="flex items-center mr-2">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        checked={enablePrice}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                          const value = e.target.checked;
                          setOrder(preOrder => ({
                            ...preOrder,
                            price: value ? order.price : pricePerItem(eth.price, 15),
                          }));
                          setEnablePrice(value);
                          return;
                        }}
                      />
                    </label>
                    <span>Adjust Price - only when the price is not correct</span>
                  </div>
                </div>
                <input
                  disabled={!enablePrice}
                  value={order.price}
                  type="text"
                  name="price"
                  id="price"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                    const value = e.target.value;
                    if (isNaN(Number(value))) return;
                    setOrder(preOrder => ({ ...preOrder, price: value }));
                    return;
                  }}
                  className="disabled:opacity-50 w-80 mb-1 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md"
                />
                <p className="text-xs text-gray-700">
                  Price will be verified at the time of the order. If the price will be lower, order can be declined (+-
                  2% slipage is allowed)
                </p>
              </div>
              <div className="mt-2 relative rounded-md">
                <div className="mb-1">
                  <label className="mb-2 font-bold">Email</label>
                </div>
                <input
                  value={order.email}
                  type="email"
                  name="email"
                  id="email"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                    const value = e.target.value;

                    setOrder(preOrder => ({ ...preOrder, email: value.trim() }));
                    return;
                  }}
                  className="w-80 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md"
                  placeholder="x@y.com"
                />
                <p className="text-xs text-gray-700 mt-1">
                  It&apos;s important to fill a correct email, otherwise the order cannot be verified. We are not
                  storing your email anywhere
                </p>
              </div>
              <div className="my-2 relative rounded-md">
                <div className="mb-1">
                  <label className="mb-2 font-bold">Repeat Email</label>
                </div>
                <input
                  value={order.confirmationEmail}
                  type="email"
                  name="confirmationEmail"
                  id="confirmationEmail"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                    const value = e.target.value;
                    setOrder(preOrder => ({ ...preOrder, confirmationEmail: value.trim() }));
                    return;
                  }}
                  className="w-80 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md"
                  placeholder="x@y.com"
                />
              </div>
              <div className="text-xs text-gray-700 flex">
                <label className="flex items-center mr-2">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    checked={hasAgreedTOS}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                      const value = e.target.checked;
                      setHasAgreedTOS(value);
                      return;
                    }}
                  />
                </label>
                <span>
                  I accept Eincode &apos;terms of service&apos; and I agree that my order can be rejected in the case
                  data provided above are not correct
                </span>
              </div>
              {formState.message && (
                <div className="p-4 my-3 text-red-700 bg-red-200 text-sm rounded-lg">{formState.message}</div>
              )}
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex">
          <Button disabled={formState.isDisabled} onClick={(): void => onSubmit(order, course)}>
            Submit
          </Button>
          <Button onClick={closeModal} variant="red">
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

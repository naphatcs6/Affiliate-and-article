import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import styles from "../styles/Home.module.css";

type Props = {}

export default function commission({ }: Props) {
  const [inputs, setInputs] = useState<any>({
    price: 0,
    amount: 0,
    commission: 0,
    result: 0,
  });
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));

  };
  // const valueCom = (inputs.price * inputs.amount) / inputs.commission * 100
  // setInputs({ ...inputs, result: valueCom })

  return (
    <Layout>
      <div className='flex justify-center'>
        <div className='flex flex-col'>
          <div className='pb-8 pt-8 flex justify-center'>
            <h3 className="text-lg font-medium leading-6 text-gray-900">Calculate commission</h3>
          </div>
          <div className="shadow sm:overflow-hidden sm:rounded-md space-y-6 bg-white px-4 py-5 sm:p-6 rounded min-w-fit flex flex-col justify-center w-1/3">
            <dl>
              <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Price (฿)</dt>
                <dd className="text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  <input className='relative block w-5/6 appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                    name="price"
                    type='number'
                    value={inputs.price}
                    onChange={handleChange}
                  />
                </dd>
              </div>
              <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Amount</dt>
                <dd className="text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  <input className='relative block w-5/6 appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                    name="amount"
                    type='number'
                    value={inputs.amount}
                    onChange={handleChange}
                  />
                </dd>
              </div>
              <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Commission (%)</dt>
                <dd className="text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  <input className='relative block w-5/6 appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                    name="commission"
                    type='number'
                    value={inputs.commission}
                    onChange={handleChange}
                  />
                </dd>
              </div>
              <div className="py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Commission amount</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{(inputs.price * inputs.amount) * inputs.commission / 100}</dd>
              </div>
              <div className="bg-gray-200 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Tier 1: Commission</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">Commission</dd>

                <dt className="text-sm font-medium text-gray-500">Tier 2: Commission</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">Commission</dd>

                <dt className="text-sm font-medium text-gray-500">Tier 3: Commission</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">Commission</dd>

                <dt className="text-sm font-medium text-gray-500">Tier 4: Commission</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">Commission</dd>

                <dt className="text-sm font-medium text-gray-500">Tier 5: Commission</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">Commission</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </Layout>
  );
}
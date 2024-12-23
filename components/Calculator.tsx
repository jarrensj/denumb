'use client'

import { useEffect, useState } from 'react';
import CoinGeckoAttribution from './CoinGeckoAttribution';

interface CoinPrices {
  bitcoin: { usd: number };
  ethereum: { usd: number };
  solana: { usd: number };
}

const Calculator = () => {
  const [prices, setPrices] = useState<CoinPrices | null>(null);
  const [btc, setBtc] = useState('');
  const [eth, setEth] = useState('');
  const [sol, setSol] = useState('');
  const [usd, setUsd] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrices = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/coins', { next: { revalidate: 1 } });
        if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data: CoinPrices = await response.json();
          setPrices(data);
        } catch (error) {
          setError('Failed to load. Please try again later.');
        } finally {
          setIsLoading(false);
        }
      };

    fetchPrices();
  }, []);

  const handleBtcChange = (value: string) => {
    setBtc(value);
    if (!prices) return;
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue)) {
      setEth(((numericValue * prices.bitcoin.usd) / prices.ethereum.usd).toString());
      setSol(((numericValue * prices.bitcoin.usd) / prices.solana.usd).toString());
      setUsd((numericValue * prices.bitcoin.usd).toString());
    }
  };

  const handleEthChange = (value: string) => {
    setEth(value);
    if (!prices) return;
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue)) {
      setBtc(((numericValue * prices.ethereum.usd) / prices.bitcoin.usd).toString());
      setSol(((numericValue * prices.ethereum.usd) / prices.solana.usd).toString());
      setUsd((numericValue * prices.ethereum.usd).toString());
    }
  };

  const handleSolChange = (value: string) => {
    setSol(value);
    if (!prices) return;
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue)) {
      setBtc(((numericValue * prices.solana.usd) / prices.bitcoin.usd).toString());
      setEth(((numericValue * prices.solana.usd) / prices.ethereum.usd).toString());
      setUsd((numericValue * prices.solana.usd).toString());
    }
  };

  const handleUsdChange = (value: string) => {
    setUsd(value);
    if (!prices) return;
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue)) {
      setBtc((numericValue / prices.bitcoin.usd).toString());
      setEth((numericValue / prices.ethereum.usd).toString());
      setSol((numericValue / prices.solana.usd).toString());
    }
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="flex flex-col space-y-4">
      <div>
        <input
          type="text"
          className="border p-2"
          value={btc}
          placeholder="bitcoin"
          onChange={(e) => handleBtcChange(e.target.value)}
        />
        <span> BTC {prices ? `@ $${prices.bitcoin.usd.toLocaleString()}` : ''}</span>
      </div>
      <div>
        <input
          type="text"
          className="border p-2"
          value={eth}
          placeholder="ethereum"
          onChange={(e) => handleEthChange(e.target.value)}
        />
        <span> ETH {prices ? `@ $${prices.ethereum.usd.toLocaleString()}` : ''}</span>
      </div>
      <div>
        <input
          type="text"
          className="border p-2"
          value={sol}
          placeholder="solana"
          onChange={(e) => handleSolChange(e.target.value)}
        />
        <span> SOL {prices ? `@ $${prices.solana.usd.toLocaleString()}` : ''}</span>
      </div>
      <div>
        <input
          type="text"
          className="border p-2"
          value={usd}
          placeholder="usd"
          onChange={(e) => handleUsdChange(e.target.value)}
        />
        <span> USD</span>
      </div>
      <CoinGeckoAttribution />
    </div>
  );
};

export default Calculator;

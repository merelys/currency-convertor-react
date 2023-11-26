import styles from './Block.module.css';

const defaultCurrencies = ['UAH', 'USD', 'EUR', 'GBP'];

function Block({
  value,
  currency,
  onChangeCurrency,
  onChangeValue,
  exchangeRateText,
}) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.currencies}>
        {defaultCurrencies.map((cur) => (
          <div
            onClick={() => onChangeCurrency(cur)}
            key={cur}
            className={`${styles.currency} ${
              currency === cur ? styles.active : ''
            }`}
          >
            {cur}
          </div>
        ))}
      </div>
      <div className={styles.counting}>
        <input
          value={value}
          type="number"
          placeholder={0}
          onChange={(e) => onChangeValue(e.target.value)}
        />
        <div className={styles.text}>{exchangeRateText}</div>
      </div>
    </div>
  );
}

export default Block;

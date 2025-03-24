import Filter from "./Filter";
import { FilterConstants } from "./FilterConstants";
import { v4 as uuid } from "uuid";
import styles from "./Filters.module.scss";

const Filters = () => {
  return (
    <div className={styles.filters}>
      {FilterConstants.map((filter) => (
        <Filter key={uuid()} label={filter.label} value={filter.value} />
      ))}
    </div>
  );
};

export default Filters;

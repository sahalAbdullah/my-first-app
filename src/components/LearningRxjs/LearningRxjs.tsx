import { Observable, from } from 'rxjs';
import { map, filter } from 'rxjs/operators';

const LearningRxjs = () => {
  let numbersObservable = from([1, 2, 3, 4, 5]);
  let squaredNumbers = numbersObservable.pipe(
    filter((val) => val > 2),
    map((val) => val * val)
  );
  let subscription = squaredNumbers.subscribe((result) => {
    console.log(result);
  });

  return (
    <div>
      <h2>Rxjs Learning</h2>
    </div>
  );
};

export default LearningRxjs;

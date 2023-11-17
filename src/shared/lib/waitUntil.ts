import {TimeoutError} from "../types/TimeoutError";

export function waitUntil(
  condition: () => boolean,
  timeout: number,
  checkInterval: number = 100
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();

    function checkCondition() {
      if (condition()) {
        resolve(true);
      } else if (Date.now() - startTime >= timeout) {
        reject(new TimeoutError('Timeout exceeded'));
      } else {
        setTimeout(checkCondition, checkInterval);
      }
    }

    checkCondition();
  });
}
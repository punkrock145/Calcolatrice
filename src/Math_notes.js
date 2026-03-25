"use strict";
const prompt = require("prompt-sync")();
/**
 * variabile che contiene l'espressione inserita
 * @type {string}
 */
let espressione = "";

/**
 * funzione per inserire l'espressione
 * @returns {string}
 */
function inserimento() {
  espressione = prompt("inserisci l'espressione da eseguire ");
  return espressione;
}
/**
 * funzione di controllo dell'espressione
 * verifica che ci siano solo numeri e operatori validi
 * @returns {boolean}
 */
function controlla() {
  inserimento();
  /**
   * operatori consentiti
   * @type {string[]}
   */
  let segni = ["+", "-", "*", "/"];

  let contienenumero = false;

  if (espressione.length === 0) {
    console.log("errore nessuna espressione inserita ");
    return false;
  }
  for (let i = 0; i < espressione.length; i++) {
    let c = espressione.charAt(i);

    // controllo caratteri validi
    if (
      !(c >= "0" && c <= "9") &&
      !segni.includes(c) &&
      c !== " " &&
      c !== "="
    ) {
      console.log("errore espressione non valida");
      return false;
    }

    if (c >= "0" && c <= "9") {
      contienenumero = true;
    }
  }

  if (!contienenumero) {
    console.log("errore non sono presenti dei numeri ");
    return false;
  }

  console.log("ok espressione valida");
  return true;
}

/**
 * esegue il calcolo tra due numeri usando uno stack
 * @param {number[]} numeri_top
 * @param {string[]} operatori_top
 */
function calcola(numeri_top, operatori_top) {
  /** @type {number} */
  let b = numeri_top.pop();

  /** @type {number} */
  let a = numeri_top.pop();

  /** @type {string} */
  let op = operatori_top.pop();

  /** @type {number} */
  let risultato = 0;

  switch (op) {
    case "+":
      risultato = a + b;
      break;

    case "-":
      risultato = a - b;
      break;

    case "*":
      risultato = a * b;
      break;

    case "/":
      risultato = a / b;
      break;
  }

  numeri_top.push(risultato);
}

/**
 * funzione principale che analizza e risolve l'espressione
 */
function esegui() {
  if (controlla() == false) {
    console.log("errore ");
    return;
  }

  /** @type {number[]} */
  let numeri_top = [];

  /** @type {string[]} */
  let operatori_top = [];

  /** @type {string} */
  let numero = "";

  for (let i = 0; i < espressione.length; i++) {
    let c = espressione.charAt(i);

    if (c === " " || c === "=") continue;

    if (c >= "0" && c <= "9") {
      while (
        i < espressione.length &&
        espressione.charAt(i) >= "0" &&
        espressione.charAt(i) <= "9"
      ) {
        numero = numero + espressione.charAt(i);
        i++;
      }

      numeri_top.push(parseInt(numero));
      numero = "";
      i--;
    } else {
      if (c === "+" || c === "-") {
        while (operatori_top.length > 0) {
          calcola(numeri_top, operatori_top);
        }
      } else if (c === "*" || c === "/") {
        while (
          operatori_top.length > 0 &&
          (operatori_top[operatori_top.length - 1] === "*" ||
            operatori_top[operatori_top.length - 1] === "/")
        ) {
          calcola(numeri_top, operatori_top);
        }
      }

      operatori_top.push(c);
    }
  }
  while (operatori_top.length > 0) {
    calcola(numeri_top, operatori_top);
  }

  console.log("il risultato è " + numeri_top.pop());
}
/**
 * funzione main principale
 */
function main() {
  console.log("ciao benvenuto in Math.notes");
  console.log("inserisci un'espressione valida e termina con =");

  let scelta = "";

  do {
    esegui();
    scelta = prompt("vuoi inserire un'altra espressione (S/N) ");
  } while (scelta === "S");
}
main();

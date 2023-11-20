import {
  filter,
  fromEvent,
  map,
  merge,
  skip,
  skipLast,
  skipWhile,
  switchMap,
  takeUntil,
  tap,
} from "rxjs";
import { useEffect, useRef, MouseEvent, useState } from "react";
import { Quadrado } from "../components/quadrado.component";

export function App1() {
  const meuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const card = meuRef.current;
    const mouseDown$ = fromEvent<MouseEvent<HTMLDivElement>>(card, "mousedown");
    const mouseUp$ = fromEvent<MouseEvent>(document, "mouseup");
    const mouseMove$ = fromEvent<MouseEvent>(document, "mousemove");

    const keyUp$ = fromEvent<KeyboardEvent>(document, "keyup");

    const draAndDrop$ = mouseDown$.pipe(
      map((e) => ({
        x: e.clientX,
        y: e.clientY,
        target: {
          x: (e.target as HTMLDivElement).offsetLeft,
          y: (e.target as HTMLDivElement).offsetTop,
        },
      })),

      //sempre a ultima inscricao estará ativa com o switchMap
      switchMap((start) =>
        merge(
          mouseMove$.pipe(
            map((e) => ({
              x: e.clientX - start.x + start.target.x,
              y: e.clientY - start.y + start.target.y,
            })),
            takeUntil(mouseUp$)
          ), // ate que o mouseUp$ seja chamado vai ficar ouvindo o mouseMove$
          keyUp$.pipe(
            tap((e) => console.log(e.key)),
            filter((e) => e.key === " "),
            tap((tecla) => {
              card.before(card.cloneNode(true));
            }),
            skipWhile(() => true)
          )
        )
      )
    );
    draAndDrop$.subscribe((val) => {
      meuRef.current.style.top = `${val.y}px`;
      meuRef.current.style.left = `${val.x}px`;
    });
  }, []);

  return (
    <>
      <div className=" flex-1 relative bg-[#13b] cursor-move ">
        <Quadrado ref={meuRef} />
      </div>
    </>
  );
}

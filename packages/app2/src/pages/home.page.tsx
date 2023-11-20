import {
  ChangeEvent,
  createElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  of,
  startWith,
  switchMap,
  tap,
} from "rxjs";
import { ajax } from "rxjs/ajax";

export function App2() {
  const ul = useRef<HTMLUListElement>();
  const refInput = useRef<HTMLInputElement>();

  const [busca$, setBusca$] = useState(of(""));
  const [listaBusca, setListaBusca] = useState<string[]>([]);

  const mostraResultado = useCallback((res: string[]) => {
    setListaBusca(res);
  }, []);

  const buscaPaisesNaApi = (termo: string) =>
    ajax(`https://restcountries.com/v3.1/name/${termo}`).pipe(
      map((ajaxResponse) => ajaxResponse.response),
      map((response) =>
        (response as any[]).map((e) => e.translations.por.common)
      )
    );

  useEffect(() => {
    const input = document.querySelector("input");
    // const input: HTMLInputElement = refInput.current ?? createElement("input");
    const input$ = fromEvent<InputEvent>(input, "input");

    const unsub = input$
      .pipe(
        debounceTime(300), // cria um delay
        map((event) => (event.target as HTMLInputElement).value),
        map((termo) => termo.trim()), // limpa todos os espaços
        distinctUntilChanged(), // fara uma distincao do valor atual e o corrente para evitar requisições desnecessarias
        switchMap((termo) => {
          if (!termo || termo.length < 3) return of([]);
          return buscaPaisesNaApi(termo);
        }),
        catchError((err, source) => {
          console.log(err);
          return source.pipe(startWith([]));
        })
      )
      .subscribe(mostraResultado);
    return () => {
      unsub.unsubscribe();
    };
  }, []);

  useEffect(() => {}, []);

  return (
    <div className={`flex flex-1 bg-[#F7B046] items-center justify-center`}>
      <input
        ref={refInput}
        className={` w-[200px] h-[30px] text-[#000] ml-[10px]`}
        placeholder="  País..."
        type="text"
      />
      <ul ref={ul}>
        {listaBusca.map((e, i) => (
          <li key={i}>{e}</li>
        ))}
      </ul>
    </div>
  );
}

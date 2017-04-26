interface window {
  title: string,
  x: number,
  y: number,
}

export default function(
  state: Array<window> = [
    {title: "a window", x: 20, y: 40},
    {title: "another window", x: 100, y: 200}
  ],
  action: any
) {
  switch (action.type) {
    case "OPEN_WIN":
      return [
        {title: action.title}, ...state
      ];
    default:
      return state;
  }
};
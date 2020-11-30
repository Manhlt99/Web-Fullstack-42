const idGame =
  window.location.pathname.split('/').pop();

let globalScores = [
  [0, 0, 0, 0]
];

const changeScore = function (event) {
  const $el = $(event.target);
  const value = $el.val();
  const row = $el.data('row');
  const col = $el.data('col');

  globalScores[row][col] = parseInt(value);

  // cập nhật điểm cột, hàng
  // tính lại điểm cột
  let sumCol = 0;
  for (let i = 0; i < globalScores.length; i++) {
    sumCol += globalScores[i][col];
  }
  let sumRow = globalScores[row][0]
    + globalScores[row][1]
    + globalScores[row][2]
    + globalScores[row][3]

  $(`#gameResult tbody th[data-col="${col}"]`).html(sumCol);
  $(`#gameResult .row-name[data-row="${row}] span`).html(sumRow);
  // thay đổi giá trị dom
}

$.ajax({
  url: `/api/games/${idGame}`,
  type: 'GET'
})
  .then(res => {
    // render html
    if (res.success) {
      const game = res.data;
      const { players, scores } = game;

      globalScores = scores;

      $('#gameResult thead').append(
        `
          <th scope="col">#</th>
          <th scope="col" data-col="0">${players[0]}</th>
          <th scope="col" data-col="1">${players[1]}</th>
          <th scope="col" data-col="2">${players[2]}</th>
          <th scope="col" data-col="3">${players[3]}</th>
        `
      )

      // tính tổng
      // [[1, 2, 3, 4], [1, 2, 3, 4]]
      // sum( scores[0][0] + scores[1][0])
      let sumCol = [0, 0, 0, 0];
      let sumRow = [];

      for (let i = 0; i < scores.length; i++) {
        const round = scores[i];
        for (let j = 0; j < round.length; j++) {
          sumCol[j] += round[j];
          sumRow[i] = 
            sumRow[i] ? sumRow[i] + round[j] : round[j];
        }
        console.log('endRound')

      }

      $('#gameResult tbody').append(
        `
          <th scope="col">Total</th>
          <th scope="col" data-col="0">${sumCol[0]}</th>
          <th scope="col" data-col="1">${sumCol[1]}</th>
          <th scope="col" data-col="2">${sumCol[2]}</th>
          <th scope="col" data-col="3">${sumCol[3]}</th>
        `
      )

      const scoreHTML = scores.map((round, idx) => {
        // round: [1, 3, 3 ,4];
        return `
          <tr>
            <td class="row-name" data-row="${idx}">Round ${idx + 1} <span> ${sumRow[idx]} </span></td>
            <td>
              <input
                class="form-control"
                type="number"
                value="${round[0]}"
                data-col="0"
                data-row="${idx}"
                oninput="changeScore(event)"
              >
            </td>
            <td>
              <input
                class="form-control"
                type="number"
                value="${round[1]}"
                data-col="1"
                data-row="${idx}"
                oninput="changeScore(event)"
              >
            </td>
            <td>
              <input
                class="form-control"
                type="number"
                value="${round[2]}"
                data-col="2"
                data-row="${idx}"
                oninput="changeScore(event)"
              >
            </td>
            <td>
              <input
                class="form-control"
                type="number"
                value="${round[3]}"
                data-col="3"
                data-row="${idx}"
                oninput="changeScore(event)"
              >
            </td>
          </tr>
        `
      }).join('');

      $('#gameResult tbody').append(scoreHTML);

    } else {
      alert('Server error')
    }
  })

  $("#addBtn").on('click', () => {
    const newRoundIdx = globalScores.length;
    globalScores.push([0,0,0,0]);

    const newRoundStr = `<tr>
    <td class="row-name" data-row="${newRoundIdx}">Round ${idx + 1} <span> ${sumRow[idx]} </span></td>
    <td>
      <input
        class="form-control"
        type="number"
        value="0"
        data-col="0"
        data-row="${newRoundIdx}"
        oninput="changeScore(event)"
      >
    </td>
    <td>
      <input
        class="form-control"
        type="number"
        value="0"
        data-col="1"
        data-row="${newRoundIdx}"
        oninput="changeScore(event)"
      >
    </td>
    <td>
      <input
        class="form-control"
        type="number"
        value="0"
        data-col="2"
        data-row="${newRoundIdx}"
        oninput="changeScore(event)"
      >
    </td>
    <td>
      <input
        class="form-control"
        type="number"
        value="0"
        data-col="3"
        data-row="${newRoundIdx}"
        oninput="changeScore(event)"
      >
    </td>
  </tr>`
    $('#gameResult tbody').append(newRoundStr)
  })

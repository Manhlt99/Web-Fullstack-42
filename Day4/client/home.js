let idQuestion;
const getRandomQuestion = () => {
    $.ajax({
        url: `http://localhost:8080/random-question`,
        method: 'GET',
        success: (res) => {
            if (res.success) {
                const question = res.data
                const {content, yesCount:yes, noCount:no, id} = question;
                document.getElementById("contentQuestion").innerHTML = content;
                // Nhiệm vụ render client
                idQuestion = id;
            }
        },
        error: (res) => {
            console.log(res);
        }
    })
}
getRandomQuestion();

const otherQuestionBtn = document.getElementById('otherQuestion');
otherQuestionBtn.addEventListener('click', () => {
    //c1: load lại trang
    // window.location.reload();

    //c2: gọi lại http get random
    getRandomQuestion();
})

document.getElementById('noBtn').addEventListener('click', () => {
    // gọi lên server 1 request
    $.ajax({
        url: `http://localhost:8080/vote-question/${idQuestion}/no`,
        method: 'GET',
        success: (req, res) => {
            console.log(res);
        }
    })
})




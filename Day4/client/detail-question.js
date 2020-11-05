//Bước 1: lấy id câu hỏi
const pathName = window.location.pathname;
let idQuestion = pathName.split('/').pop();


$.ajax({
    url: `http://localhost:8080/detail-question/${idQuestion}`,
    method: 'GET',
    success: (res) => {
        if (res.success) {
            const question = res.data;
            const { content, id, yesCount, noCount } = question;

            const total = yesCount + noCount;
            const percentYes = total !== 0 ? (yesCount / total * 100).toFixed(2) : parseFloat(50).toFixed(2);
            const percentNo = (100 - percentYes).toFixed(2);

            // Nhiệm vụ render của client
            document.getElementById("contentQuestion").innerHTML = content;
            document.getElementById("totalVote").innerHTML = total;
            document.getElementById("percentNo").innerHTML = percentNo;
            document.getElementById("percentYes").innerHTML = percentYes;
        }
    },
    error: (res) => {
        console.log(res);
    }
})

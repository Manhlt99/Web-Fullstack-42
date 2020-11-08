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
            // const processBar = $(".progress-bar");
            
            const total = yesCount + noCount;
            const percentYes = total !== 0 ? (yesCount / total * 100).toFixed(2) : parseFloat(50).toFixed(2);
            const percentNo = (100 - percentYes).toFixed(2);

            // Nhiệm vụ render của client
            $("#contentQuestion").html(content);
            $("#totalVote").html(total);
            $("#percentNo").html(percentNo);
            $("#percentYes").html(percentYes);            

            $(".no-answer")[0].style.width = `${percentNo}%`;
            $(".yes-answer")[0].style.width = `${percentYes}%`;

            // let processBar = $(".yes-answer");
            // let processPercentNo = processBar[0]
            // processPercentNo.style.width = `${percentNo}%`

            // let a = processBar[0].style.width;
            // console.log(a.css(percentNo));
            // console.log(a+'%');
        }
    },
    error: (res) => {
        console.log(res);
    }
})


const textArea = document.querySelector('.formQuestion');
const form = document.getElementById('form');

//Step 1: Bắt sự kiện
form.addEventListener("submit", (event) => {
    event.preventDefault();

    //Step 2: Lấy giá trị của text area (ô  chứa nội dung)
    const content = textArea.value;

    //Step 3: Gửi dữ liệu lên server
    if (content !== "") {
        $.ajax({
            url: 'http://localhost:8080/create-question',
            type: 'POST',
            data: {
                content: content,
            },
            success: (res) => {
                if (res.success) {
                    const idQuestion = res.data.id;
                    window.location.href = 'http://localhost:8080/question/' + idQuestion;
                }
            },
            error: (res) => {
                console.log(err);
            }
        })
    }
})

textArea.addEventListener('input', () => {
    const content = textArea.value;
    const reactCharacterLength = 200 - content.length;

    const restSpan = document.getElementById('rest');
    restSpan.innerHTML = reactCharacterLength
})
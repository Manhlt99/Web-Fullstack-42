$('#form').on('submit', (event) => {
    event.preventDefault();
    
    const keyword = $('#search-input').val();

    $.ajax({
        url: 'http://localhost:8080/search-question',
        medthod: 'GET',
        data: {
            keyword
        },
        success: (res) => {
            console.log(res);

            // End bước 1
            if(res.success){
                const { data:questions } = res;
                console.log(questions);

                const htmlStrArr = questions.map(question => {
                    const { content, yesCount, noCount } = question;

                    return `<div>${content} ${yesCount} ${noCount}</div>`
                });

                const htmlDom = htmlStrArr.join('')
                console.log(htmlDom);
                $('#result').html('');
                $('#result').append(htmlDom);
            }
        }
    })
})
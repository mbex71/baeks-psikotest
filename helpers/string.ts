// export const stringToArray = (str: string, separator:string) => str?.split(separator);
export const stringToArray = (str: string, separator:string) => str?.split('');

export const getWrongAnswer = (correctAnswer: string) => {
    const answer = 'abcde'
    const wrongAnswer = stringToArray(answer, '').filter(item => {
        return !correctAnswer.includes(item)
    })
    return wrongAnswer.join('')
}
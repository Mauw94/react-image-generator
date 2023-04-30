import React from "react"

const App = () => {
    return (
        <div>
            <Background />
            <Images />
            <Search />
        </div>
    )
}

class Images extends React.Component {
    render() {
        return <section className="images-section"></section>
    }
}

class Search extends React.Component<{}, { error: boolean, errorMessage: string, loading: boolean }> {
    submitIcon: Element

    constructor(props) {
        super(props)
        this.state = {
            error: false,
            errorMessage: "",
            loading: false
        }
    }

    componentDidMount(): void {
        this.submitIcon = document.querySelector("#submit-icon")
        this.submitIcon.addEventListener("click", this.getImages)
    }

    getImages = async () => {
        const imageSection = document.querySelector(".images-section")
        const input = document.getElementById("prompt") as HTMLInputElement | undefined

        if (input.value == "") {
            this.setState({
                error: true,
                errorMessage: "input field is empty",
                loading: false
            })
            return
        }

        const prompt = input.value
        const API_KEY = process.env.API_KEY
        const options = {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "prompt": prompt,
                "n": 4,
                "size": "1024x1024"
            })
        }
        try {
            this.setState({
                error: false,
                errorMessage: "",
                loading: true
            })

            imageSection.innerHTML = ""

            let data: any
            await fetch("https://api.openai.com/v1/images/generations", options)
                .then(async (response) => {
                    data = await response.json()
                    this.setState({
                        error: false,
                        errorMessage: "",
                        loading: false
                    })
                    input.value = ""
                })

            data?.data.forEach((imageObj: any) => {
                const imageContainer = document.createElement("div")
                imageContainer.classList.add("image-container")
                const imageElement = document.createElement("img")
                imageElement.setAttribute("src", imageObj.url)
                imageContainer.append(imageElement)
                imageSection.append(imageContainer)
            })

        } catch (err) {
            console.error(err)
            this.setState({
                error: true,
                errorMessage: "Something went wrong, please try again",
                loading: false
            })
        }
    }

    render() {
        return (
            <div>
                {this.state.loading ? <LoadingSpinner /> : null}
                <section className="bottom-section">
                    <div className="input-container">
                        <input id="prompt" />
                        <div id="submit-icon">➢</div>
                    </div>
                </section>
                <Error error={this.state.error} errorMessage={this.state.errorMessage} />
            </div>
        )
    }
}

const Error = (props) => {
    let { error, errorMessage } = props
    if (error) {
        return <p className="error">{errorMessage}</p>
    }
}

function LoadingSpinner() {
    return (
        <div>
            <div className="spinner-container">
                <div className="loading-spinner"></div>
            </div>
        </div>
    )
}

class Background extends React.Component {
    render() {
        return <svg xmlns="http://www.w3.org/2000/svg" id="visual" viewBox="0 0 900 600" version="1.1"><rect x="0" y="0" width="100vw" height="100vw" fill="#001220" /><path d="M0 349L18.8 337.7C37.7 326.3 75.3 303.7 112.8 290.3C150.3 277 187.7 273 225.2 268.7C262.7 264.3 300.3 259.7 337.8 272.7C375.3 285.7 412.7 316.3 450.2 314.8C487.7 313.3 525.3 279.7 562.8 264.5C600.3 249.3 637.7 252.7 675.2 262.5C712.7 272.3 750.3 288.7 787.8 294.5C825.3 300.3 862.7 295.7 881.3 293.3L900 291L900 601L881.3 601C862.7 601 825.3 601 787.8 601C750.3 601 712.7 601 675.2 601C637.7 601 600.3 601 562.8 601C525.3 601 487.7 601 450.2 601C412.7 601 375.3 601 337.8 601C300.3 601 262.7 601 225.2 601C187.7 601 150.3 601 112.8 601C75.3 601 37.7 601 18.8 601L0 601Z" fill="#d74c86" /><path d="M0 289L18.8 300.7C37.7 312.3 75.3 335.7 112.8 350.8C150.3 366 187.7 373 225.2 376.8C262.7 380.7 300.3 381.3 337.8 367.5C375.3 353.7 412.7 325.3 450.2 325.5C487.7 325.7 525.3 354.3 562.8 359.2C600.3 364 637.7 345 675.2 340.3C712.7 335.7 750.3 345.3 787.8 349.5C825.3 353.7 862.7 352.3 881.3 351.7L900 351L900 601L881.3 601C862.7 601 825.3 601 787.8 601C750.3 601 712.7 601 675.2 601C637.7 601 600.3 601 562.8 601C525.3 601 487.7 601 450.2 601C412.7 601 375.3 601 337.8 601C300.3 601 262.7 601 225.2 601C187.7 601 150.3 601 112.8 601C75.3 601 37.7 601 18.8 601L0 601Z" fill="#b44384" /><path d="M0 389L18.8 395.2C37.7 401.3 75.3 413.7 112.8 404.5C150.3 395.3 187.7 364.7 225.2 353.8C262.7 343 300.3 352 337.8 353.5C375.3 355 412.7 349 450.2 360.8C487.7 372.7 525.3 402.3 562.8 416C600.3 429.7 637.7 427.3 675.2 423.2C712.7 419 750.3 413 787.8 407.5C825.3 402 862.7 397 881.3 394.5L900 392L900 601L881.3 601C862.7 601 825.3 601 787.8 601C750.3 601 712.7 601 675.2 601C637.7 601 600.3 601 562.8 601C525.3 601 487.7 601 450.2 601C412.7 601 375.3 601 337.8 601C300.3 601 262.7 601 225.2 601C187.7 601 150.3 601 112.8 601C75.3 601 37.7 601 18.8 601L0 601Z" fill="#903c7e" /><path d="M0 405L18.8 408C37.7 411 75.3 417 112.8 425.3C150.3 433.7 187.7 444.3 225.2 440.8C262.7 437.3 300.3 419.7 337.8 407.7C375.3 395.7 412.7 389.3 450.2 393C487.7 396.7 525.3 410.3 562.8 423.2C600.3 436 637.7 448 675.2 446.2C712.7 444.3 750.3 428.7 787.8 421.5C825.3 414.3 862.7 415.7 881.3 416.3L900 417L900 601L881.3 601C862.7 601 825.3 601 787.8 601C750.3 601 712.7 601 675.2 601C637.7 601 600.3 601 562.8 601C525.3 601 487.7 601 450.2 601C412.7 601 375.3 601 337.8 601C300.3 601 262.7 601 225.2 601C187.7 601 150.3 601 112.8 601C75.3 601 37.7 601 18.8 601L0 601Z" fill="#6d3574" /><path d="M0 439L18.8 439C37.7 439 75.3 439 112.8 445.2C150.3 451.3 187.7 463.7 225.2 465C262.7 466.3 300.3 456.7 337.8 447.8C375.3 439 412.7 431 450.2 432.5C487.7 434 525.3 445 562.8 458.3C600.3 471.7 637.7 487.3 675.2 487.2C712.7 487 750.3 471 787.8 459.8C825.3 448.7 862.7 442.3 881.3 439.2L900 436L900 601L881.3 601C862.7 601 825.3 601 787.8 601C750.3 601 712.7 601 675.2 601C637.7 601 600.3 601 562.8 601C525.3 601 487.7 601 450.2 601C412.7 601 375.3 601 337.8 601C300.3 601 262.7 601 225.2 601C187.7 601 150.3 601 112.8 601C75.3 601 37.7 601 18.8 601L0 601Z" fill="#4b2d66" /><path d="M0 540L18.8 540.3C37.7 540.7 75.3 541.3 112.8 536.3C150.3 531.3 187.7 520.7 225.2 511C262.7 501.3 300.3 492.7 337.8 491.2C375.3 489.7 412.7 495.3 450.2 496.2C487.7 497 525.3 493 562.8 488.5C600.3 484 637.7 479 675.2 480.7C712.7 482.3 750.3 490.7 787.8 494.5C825.3 498.3 862.7 497.7 881.3 497.3L900 497L900 601L881.3 601C862.7 601 825.3 601 787.8 601C750.3 601 712.7 601 675.2 601C637.7 601 600.3 601 562.8 601C525.3 601 487.7 601 450.2 601C412.7 601 375.3 601 337.8 601C300.3 601 262.7 601 225.2 601C187.7 601 150.3 601 112.8 601C75.3 601 37.7 601 18.8 601L0 601Z" fill="#2b2454" /><path d="M0 519L18.8 526C37.7 533 75.3 547 112.8 551.5C150.3 556 187.7 551 225.2 544.8C262.7 538.7 300.3 531.3 337.8 527.2C375.3 523 412.7 522 450.2 530C487.7 538 525.3 555 562.8 554.5C600.3 554 637.7 536 675.2 534.5C712.7 533 750.3 548 787.8 548.2C825.3 548.3 862.7 533.7 881.3 526.3L900 519L900 601L881.3 601C862.7 601 825.3 601 787.8 601C750.3 601 712.7 601 675.2 601C637.7 601 600.3 601 562.8 601C525.3 601 487.7 601 450.2 601C412.7 601 375.3 601 337.8 601C300.3 601 262.7 601 225.2 601C187.7 601 150.3 601 112.8 601C75.3 601 37.7 601 18.8 601L0 601Z" fill="#0a1a40" /></svg>
    }
}

export default App
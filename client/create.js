const $ = (el) => document.querySelector(el)

window.onload = function () {
  $('#url').focus()
}

// click X button to clear the fields
$('#clear').addEventListener('click', () => {
  $('#result').style.display = 'none'
  $('#url').value = ''
  $('#url').focus()
  $('#message').innerText = ''
})

// click copy button
$('#copy').addEventListener('click', async () => {
  const short = $('#short').value.trim()
  if (short) {
    $('#short').focus()
    $('#short').select()
    try {
      await navigator.clipboard.writeText(short)
    } catch (e) {
      console.log('not copied')
    }
  }
})

function message(msg, color) {
  $('#message').innerText = msg
  $('#message').style.color = color
}

// cClick the Create button; when it has been created,
// change the focus to Result.
$('[type=submit]').addEventListener('click', (e) => {
  e.preventDefault()
  $('#result').style.display = 'none'
  const url = $('#url').value.trim()
  if (url) {
    let newUrl
    try {
      newUrl = new URL(url)
    } catch (e) {
      message('Error: Must enter a valid URL', 'red')
      return
    }
    $('#url').value = url
    message('Creating...', 'green')
    fetch('/shorten', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: newUrl.href })
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then((data) => {
        // was ok
        message('', 'green')
        $('#result').style.display = 'block'
        $('#short').value = `${window.location.origin}/${data.shortCode}`
        $('#short').focus()
        $('#short').select()
        $('#go').setAttribute('href', `/${data.shortCode}`)
      })
      .catch((error) => {
        message('Error creating, try again.', 'red')
        console.error('There was a problem with the fetch operation:', error)
      })
  } else message('Error: Must enter a valid URL', 'red')
})

'use strict';

// A helper function for shortening querySelectorAll()
function qsa( cls )
{
	return document.querySelectorAll( cls );
}

/*
// Add numbers to boxes randomly
function generateRandomNumber()
{
	let myNumArray = [ 1, 2, 3, 4, 5, 6, 7, 8 ];
	myNumArray.sort( function() { return 0.5 - Math.random() } ); // Shuffle array items
	let elementNum = 0;

	for ( let i = 0; i <= 2; i++ )
	{
		for ( let j = 0; j <= 2; j++ )
		{
			if ( i !== 2 || j !== 2 )
			{
				qsa( 'tr' )[ i ].querySelectorAll( 'td' )[ j ].innerHTML = myNumArray[ elementNum++ ];
			} // if ends
			else
			{
				// Ensure that the last cell is empty
				qsa( 'tr' )[ i ].querySelectorAll( 'td' )[ j ].innerHTML = '';
			}
		} // for loop ends
	} // for loop ends
} // generateRandomNumber() ends
// generateRandomNumber();
*/

function sortTable()
{
	for ( let i = 0; i <= 1000; i++ )
	{
		moveNum( Math.round( 2 * Math.random() ), Math.round( 2 * Math.random() ), false );
	}
}
sortTable();


function moveNum( x, y, z )
{
	// Don't do anything if the cell is empty
	if ( qsa( 'tr' )[ x ].querySelectorAll( 'td' )[ y ].innerHTML == '' )
	{
		return;
	}

	// Check if top is empty
	if ( x > 0 )
	{
		if ( qsa( 'tr' )[ x - 1 ].querySelectorAll( 'td' )[ y ].innerHTML == '' )
		{
			qsa( 'tr' )[ x - 1 ].querySelectorAll( 'td' )[ y ].innerHTML = qsa( 'tr' )[ x ].querySelectorAll( 'td' )[ y ].innerHTML;
			qsa( 'tr' )[ x ].querySelectorAll( 'td' )[ y ].innerHTML = '';
			if ( z === true ) checkBoxes();
			return;
		}
	}

	// Check if bottom is empty
	if ( x < 2 )
	{
		if ( qsa( 'tr' )[ x + 1 ].querySelectorAll( 'td' )[ y ].innerHTML == '' )
		{
			qsa( 'tr' )[ x + 1 ].querySelectorAll( 'td' )[ y ].innerHTML = qsa( 'tr' )[ x ].querySelectorAll( 'td' )[ y ].innerHTML;
			qsa( 'tr' )[ x ].querySelectorAll( 'td' )[ y ].innerHTML = '';
			if ( z === true ) checkBoxes();
			return;
		}
	}

	// Check if right is empty
	if ( y > 0 )
	{
		if ( qsa( 'tr' )[ x ].querySelectorAll( 'td' )[ y - 1 ].innerHTML == '' )
		{
			qsa( 'tr' )[ x ].querySelectorAll( 'td' )[ y - 1 ].innerHTML = qsa( 'tr' )[ x ].querySelectorAll( 'td' )[ y ].innerHTML;
			qsa( 'tr' )[ x ].querySelectorAll( 'td' )[ y ].innerHTML = '';
			if ( z === true ) checkBoxes();
			return;
		}
	}

	// Check if left is empty
	if ( y < 2 )
	{
		if ( qsa( 'tr' )[ x ].querySelectorAll( 'td' )[ y + 1 ].innerHTML == '' )
		{
			qsa( 'tr' )[ x ].querySelectorAll( 'td' )[ y + 1 ].innerHTML = qsa( 'tr' )[ x ].querySelectorAll( 'td' )[ y ].innerHTML;
			qsa( 'tr' )[ x ].querySelectorAll( 'td' )[ y ].innerHTML = '';
			if ( z === true ) checkBoxes();
			return;
		}
	}
}

function checkBoxes()
{
	let elementNum = 1;

	for ( let i = 0; i <= 2; i++ )
	{
		for ( let j = 0; j <= 2; j++ )
		{
			if ( i == 2 && j == 2 )
			{
				continue;
			}
			if ( qsa( 'tr' )[ i ].querySelectorAll( 'td' )[ j ].innerHTML != elementNum++ )
			{
				return;
			}
		}
	}

	// Pause the timer
	pauseTimer();

	// Show congratulations message
	setTimeout( () => {
		alert( 'Congratulations!' );
	}, 50 );
}
// checkBoxes();


// Variables for timer management
let timerStat = false;
let secCounter;

// A function to toggle the timer
function toggleTimer()
{
	if ( timerStat === false )
	{
		// If the timer is off, turn it on
		timerStat = true;

		// Change the text of the timer start button
		document.querySelector( '.timerButton' ).innerText = 'Pause Timer';

		// Turn on the timer
		secCounter = setInterval( updateTimer, 1000 );
	}
	else
	{
		// If the timer is on, turn it off
		timerStat = false;

		// Change the text of the timer start button
		document.querySelector( '.timerButton' ).innerText = 'Start Timer';

		// Turn off the timer
		clearInterval( secCounter );
	}
} // End of toggleTimer()

// A function to update the time of the timer
function updateTimer()
{
	// Get the values of the second and the minute
	let sec = parseInt( document.querySelector( '.sec' ).innerText );
	let min = parseInt( document.querySelector( '.min' ).innerText );

	if ( sec < 59 )
	{
		// Only increase the value of second
		if ( sec < 9 )
		{
			// If the value of second is single digit, pad it with a zero
			document.querySelector( '.sec' ).innerText = '0' + ++sec;
		}
		else
		{
			document.querySelector( '.sec' ).innerText = ++sec;
		}
	}
	else
	{
		// Reset the value of second
		document.querySelector( '.sec' ).innerText = '00';

		// Increase the value of minute
		if ( min < 9 )
		{
			// If the value of minute is single digit, pad it with a zero
			document.querySelector( '.min' ).innerText = '0' + ++min;
		}
		else
		{
			document.querySelector( '.min' ).innerText = ++min;
		}
	}
} // End of updateTimer()

// A function to pause the timer
function pauseTimer()
{
	if ( timerStat === true )
	{
		// If the timer is on, turn it off
		timerStat = false;

		// Change the text of the timer start button
		document.querySelector( '.timerButton' ).innerText = 'Start Timer';

		// Turn off the timer
		clearInterval( secCounter );
	}
} // End of pauseTimer()

// A function to reset the timer
function resetTimer()
{
	// Turn off the timer
	clearInterval( secCounter );

	timerStat = false;

	// Change the text of the timer start button
	document.querySelector( '.timerButton' ).innerText = 'Start Timer';

	// Reset the value of second and minute
	document.querySelector( '.sec' ).innerText = '00';
	document.querySelector( '.min' ).innerText = '00';
} // End of resetTimer()

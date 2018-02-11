navigator.permissions.query({ name: 'accelerometer' }).then(result => {
    if (result.state === 'denied') {
        console.log('Permission to use accelerometer sensor is denied.');
        return;
    }

    let acl = new Accelerometer({frequency: 30});
    let max_magnitude = 0;
    acl.addEventListener('activate', () => console.log('Ready to measure.'));
    acl.addEventListener('error', error => console.log(`Error: ${error.name}`));
    acl.addEventListener('reading', () => {
        let magnitude = Math.hypot(acl.x, acl.y, acl.z);
        if (magnitude > max_magnitude) {
            max_magnitude = magnitude;
            console.log(`Max magnitude: ${max_magnitude} m/s2`);
        }
    });
    acl.start();
});
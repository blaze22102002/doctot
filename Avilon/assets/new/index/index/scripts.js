document.addEventListener('DOMContentLoaded', () => {
    const { jsPDF } = window.jspdf; // Ensure jsPDF is accessed correctly

    const patientData = {
        "001": {
            name: "John Doe",
            medicines: [
                { name: "Medicine A", prescribed: 10, stock: 5 },
                { name: "Medicine B", prescribed: 8, stock: 8 }
            ]
        },
        "002": {
            name: "Jane Smith",
            medicines: [
                { name: "Medicine C", prescribed: 5, stock: 10 },
                { name: "Medicine D", prescribed: 2, stock: 12 }
            ]
        }
    };

    const prescriptionTableBody = document.getElementById('prescriptionTableBody');
    const medicineTableBody = document.getElementById('medicineTableBody');
    const billTableBody = document.getElementById('billTableBody');

    function updatePrescriptionTable() {
        prescriptionTableBody.innerHTML = '';
        Object.keys(patientData).forEach(patientId => {
            const patient = patientData[patientId];
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${patientId}</td>
                <td>${patient.name}</td>
                <td>Dr. Smith</td>
                <td>${patient.medicines.map(m => `${m.name} (${m.prescribed})`).join('; ')}</td>
                <td><button class="btn btn-info" data-bs-toggle="modal" data-bs-target="#distributeModal" data-patient-id="${patientId}">Distribute</button></td>
            `;
            prescriptionTableBody.appendChild(row);
        });
    }

    function filterPrescriptions(searchTerm) {
        searchTerm = searchTerm.toLowerCase();
        const rows = prescriptionTableBody.querySelectorAll('tr');
        rows.forEach(row => {
            const patientName = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
            const doctor = row.querySelector('td:nth-child(3)').textContent.toLowerCase();
            const medicines = row.querySelector('td:nth-child(4)').textContent.toLowerCase();
            
            if (patientName.includes(searchTerm) || doctor.includes(searchTerm) || medicines.includes(searchTerm)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }

    document.getElementById('addPrescriptionForm').addEventListener('submit', event => {
        event.preventDefault();
        const patientId = document.getElementById('patientId').value;
        const patientName = document.getElementById('patientName').value;
        const doctorName = document.getElementById('doctorName').value;
        const medicines = document.getElementById('medicines').value.split(';').map(item => {
            const [name, quantity] = item.split(',');
            return { name: name.trim(), prescribed: parseInt(quantity.trim()) };
        });

        patientData[patientId] = { name: patientName, medicines };
        updatePrescriptionTable();
        $('#addPrescriptionModal').modal('hide');
    });

    document.getElementById('prescriptionTableBody').addEventListener('click', event => {
        if (event.target.dataset.patientId) {
            const patientId = event.target.dataset.patientId;
            const patient = patientData[patientId];
            medicineTableBody.innerHTML = '';
            patient.medicines.forEach(m => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${m.name}</td>
                    <td>${m.prescribed}</td>
                    <td>${m.stock}</td>
                    <td>${m.stock - m.prescribed}</td>
                    <td><button class="btn btn-success" data-patient-id="${patientId}">Give</button></td>
                `;
                medicineTableBody.appendChild(row);
            });
            document.getElementById('patientNameHeader').textContent = `Patient: ${patient.name}`;
        }
    });

    document.getElementById('generateBillBtn').addEventListener('click', () => {
        const patientId = document.querySelector('#distributeModal button[data-patient-id]').dataset.patientId;
        const patient = patientData[patientId];
        const billData = patient.medicines.map(m => ({ name: m.name, count: m.prescribed, price: 10 })); // Dummy price

        let subtotal = 0;
        billData.forEach(item => subtotal += item.count * item.price);

        document.getElementById('billTableBody').innerHTML = '';
        billData.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.count}</td>
                <td>${item.price}</td>
            `;
            billTableBody.appendChild(row);
        });

        document.getElementById('subtotal').textContent = `$${subtotal}`;
        document.getElementById('tax').textContent = `$${(subtotal * 0.1).toFixed(2)}`;
        document.getElementById('total').textContent = `$${(subtotal * 1.1).toFixed(2)}`;
        $('#billModal').modal('show');
    });

    document.getElementById('downloadPdfBtn').addEventListener('click', () => {
        const doc = new jsPDF();
        doc.text('Generated Bill', 10, 10);

        const table = document.querySelector('#billTableBody');
        const rows = Array.from(table.querySelectorAll('tr')).map(tr => {
            const cells = Array.from(tr.querySelectorAll('td')).map(td => td.textContent);
            return cells;
        });

        doc.autoTable({
            head: [['Medicine', 'Count', 'Price']],
            body: rows
        });
        doc.save('bill.pdf');
    });

    document.getElementById('prescriptionSearch').addEventListener('input', (event) => {
        filterPrescriptions(event.target.value);
    });

    updatePrescriptionTable(); // Initialize table
});

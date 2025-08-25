    const PDFDocument = require('pdfkit');
    const fs = require('fs'); // For saving to file, optional

    // Example function to generate a PDF
    function generatePdf(data, res) {
        const doc = new PDFDocument();

        // Pipe the PDF to the response for direct download
        doc.pipe(res);

        // Add content to the PDF
        doc.fontSize(25).text('Hello from PDFKit!', 100, 100);
        doc.text(`Data from React: ${data.message}`);

        // End the document
        doc.end();
    }

    // Example Express route
    app.get('/generate-pdf', (req, res) => {
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="generated.pdf"');
        generatePdf({ message: 'Dynamic Content' }, res);
    });
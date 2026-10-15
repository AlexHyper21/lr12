import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import PriceChart from '../components/PriceChart/PriceChart';
import { fetchAnalyticsSummary } from '../api/analytics';

export default function AnalyticsPage() {
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;
    fetchAnalyticsSummary()
      .then((data) => {
        if (!ignore) {
          setSummary(data);
        }
      })
      .catch((err) => {
        if (!ignore) {
          setError(err.message);
        }
      });
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <Container as="main" id="main" tabIndex={-1} className="py-4 py-md-5">
      <h1 className="h2 fw-bold mb-1">Аналитика цен</h1>
      <p className="text-secondary mb-4">Средняя цена цифровых товаров в каждой категории каталога</p>
      {error && <Alert variant="danger" role="alert">{error}</Alert>}
      {!summary && !error && (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Загрузка аналитики…</span>
        </Spinner>
      )}
      {summary && (
        <Row className="g-4">
          <Col lg={8}>
            <Card className="border shadow-sm h-100">
              <Card.Body>
                <PriceChart categories={summary.categories} currency={summary.currency} />
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4}>
            <Card className="border shadow-sm h-100">
              <Card.Body>
                <h2 className="h6 fw-bold">Данные графика</h2>
                <Table size="sm" className="mb-2">
                  <thead>
                    <tr>
                      <th scope="col">Категория</th>
                      <th scope="col" className="text-end">Товаров</th>
                      <th scope="col" className="text-end">Средняя, {summary.currency}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {summary.categories.map((c) => (
                      <tr key={c.category}>
                        <th scope="row" className="fw-normal">{c.category}</th>
                        <td className="text-end">{c.count}</td>
                        <td className="text-end fw-semibold">{c.avgPrice}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <p className="small text-secondary mb-0">
                  Всего товаров: {summary.totalProducts}. Расчёт выполнен на сервере (MongoDB aggregate).
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
}
